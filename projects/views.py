import base64
import binascii
import re
from urllib.parse import quote
from datetime import date

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views.decorators.http import require_POST

from .models import MarkdownImage, Project


def _superuser_required(view_func):
    return user_passes_test(
        lambda user: user.is_authenticated and user.is_superuser,
        login_url='admin_login',
    )(view_func)


def admin_login(request):
    if request.user.is_authenticated and request.user.is_superuser:
        return redirect('projects:index')

    context = {'error': ''}
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)

        if user and user.is_superuser:
            login(request, user)
            return redirect('projects:index')

        context['error'] = 'Invalid superuser username or password.'

    return render(request, 'admin_login.html', context)


@_superuser_required
def admin_logout(request):
    if request.method == 'POST':
        logout(request)
        return redirect('admin_login')
    return redirect('projects:index')


def index(request):
    projects = Project.objects.all()
    cleanup_result = None
    if request.GET.get('cleanup') == '1':
        cleanup_result = {
            'deleted': request.GET.get('deleted', '0'),
            'kept': request.GET.get('kept', '0'),
        }
    return render(
        request,
        'project.html',
        {'projects': projects, 'cleanup_result': cleanup_result},
    )


def detail(request, project_id: int):
    project = get_object_or_404(Project, pk=project_id)
    return render(request, 'project_detail.html', {'project': project})


def _project_form_defaults(project=None):
    if not project:
        return {
            'title': '',
            'tagline': '',
            'description': '',
            'tech_stack': '',
            'github_url': '',
            'live_url': '',
            'created_at': '',
        }

    return {
        'title': project.title,
        'tagline': project.tagline,
        'description': project.description,
        'tech_stack': project.tech_stack,
        'github_url': project.github_url,
        'live_url': project.live_url,
        'created_at': project.created_at.isoformat() if project.created_at else '',
    }


def _parse_created_at(created_at_value):
    if not created_at_value:
        return None
    try:
        return date.fromisoformat(created_at_value)
    except ValueError:
        return None


@_superuser_required
def add_project(request):
    form_values = _project_form_defaults()

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        form_values = {
            'title': title,
            'tagline': request.POST.get('tagline', '').strip(),
            'description': request.POST.get('description', ''),
            'tech_stack': request.POST.get('tech_stack', '').strip(),
            'github_url': request.POST.get('github_url', '').strip(),
            'live_url': request.POST.get('live_url', '').strip(),
            'created_at': request.POST.get('created_at', '').strip(),
        }

        if not title:
            return render(
                request,
                'project_add.html',
                {
                    'error': 'Title is required.',
                    'form_values': form_values,
                    'is_edit': False,
                },
                status=400,
            )

        created_date = _parse_created_at(form_values['created_at'])

        Project.objects.create(
            title=title,
            tagline=form_values['tagline'],
            description=form_values['description'],
            tech_stack=form_values['tech_stack'],
            github_url=form_values['github_url'],
            live_url=form_values['live_url'],
            created_at=created_date,
        )
        return redirect('projects:index')

    return render(
        request,
        'project_add.html',
        {'error': '', 'form_values': form_values, 'is_edit': False},
    )


@_superuser_required
def edit_project(request, project_id: int):
    project = get_object_or_404(Project, pk=project_id)
    form_values = _project_form_defaults(project)

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        form_values = {
            'title': title,
            'tagline': request.POST.get('tagline', '').strip(),
            'description': request.POST.get('description', ''),
            'tech_stack': request.POST.get('tech_stack', '').strip(),
            'github_url': request.POST.get('github_url', '').strip(),
            'live_url': request.POST.get('live_url', '').strip(),
            'created_at': request.POST.get('created_at', '').strip(),
        }

        if not title:
            return render(
                request,
                'project_add.html',
                {
                    'error': 'Title is required.',
                    'form_values': form_values,
                    'is_edit': True,
                    'project': project,
                },
                status=400,
            )

        project.title = title
        project.tagline = form_values['tagline']
        project.description = form_values['description']
        project.tech_stack = form_values['tech_stack']
        project.github_url = form_values['github_url']
        project.live_url = form_values['live_url']
        project.created_at = _parse_created_at(form_values['created_at'])
        project.save()

        return redirect('projects:detail', project_id=project.id)

    return render(
        request,
        'project_add.html',
        {'error': '', 'form_values': form_values,
            'is_edit': True, 'project': project},
    )


@require_POST
@_superuser_required
def delete_project(request, project_id: int):
    project = get_object_or_404(Project, pk=project_id)
    project.delete()
    return redirect('projects:index')


@require_POST
@_superuser_required
def upload_markdown_file(request):
    uploaded_file = request.FILES.get('file') or request.FILES.get('image')
    if not uploaded_file:
        return JsonResponse({'error': 'No file provided.'}, status=400)

    content_type = getattr(uploaded_file, 'content_type',
                           '') or 'application/octet-stream'
    file_bytes = uploaded_file.read()

    markdown_file = MarkdownImage.objects.create(
        mime_type=content_type,
        original_name=uploaded_file.name,
        data_base64='',
        data_binary=file_bytes,
        uploaded_by=request.user,
    )

    file_id = markdown_file.id
    if content_type.startswith('image/'):
        markdown = f'![{uploaded_file.name}](mdfile:{file_id})'
    else:
        markdown = f'[{uploaded_file.name}](mdfile:{file_id})'

    return JsonResponse(
        {
            'id': file_id,
            'markdown': markdown,
            'preview_url': reverse('projects:markdown_file', kwargs={'file_id': file_id}),
        }
    )


@require_POST
@_superuser_required
def upload_markdown_image(request):
    return upload_markdown_file(request)


def _read_markdown_file_bytes(markdown_file: MarkdownImage):
    if markdown_file.data_binary is not None:
        return bytes(markdown_file.data_binary)
    try:
        return base64.b64decode(markdown_file.data_base64)
    except (binascii.Error, ValueError) as exc:
        raise Http404('Invalid file data.') from exc


def markdown_file(request, file_id: int):
    markdown_asset = get_object_or_404(MarkdownImage, pk=file_id)
    raw_file = _read_markdown_file_bytes(markdown_asset)
    response = HttpResponse(raw_file, content_type=markdown_asset.mime_type)

    if markdown_asset.original_name:
        encoded_name = quote(markdown_asset.original_name)
        response['Content-Disposition'] = (
            f"inline; filename*=UTF-8''{encoded_name}"
        )

    return response


def markdown_image(request, image_id: int):
    return markdown_file(request, file_id=image_id)


@require_POST
@_superuser_required
def cleanup_unused_markdown_images(request):
    token_pattern = re.compile(r'(?:mdimg|mdfile):(\d+)')
    used_image_ids = set()

    for description in Project.objects.values_list('description', flat=True):
        if not description:
            continue
        for image_id in token_pattern.findall(description):
            used_image_ids.add(int(image_id))

    all_images = MarkdownImage.objects.all()
    total_images = all_images.count()
    if used_image_ids:
        unused_images = all_images.exclude(id__in=used_image_ids)
    else:
        unused_images = all_images

    deleted_images = unused_images.count()
    unused_images.delete()
    kept_images = total_images - deleted_images

    return redirect(f"{reverse('projects:index')}?cleanup=1&deleted={deleted_images}&kept={kept_images}")
