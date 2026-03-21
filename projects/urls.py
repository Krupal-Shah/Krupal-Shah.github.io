from django.urls import path, re_path
from . import views

app_name = 'projects'
urlpatterns = [
    path('add/', views.add_project, name='add'),
    path('<int:project_id>/edit/', views.edit_project, name='edit'),
    path('<int:project_id>/delete/', views.delete_project, name='delete'),
    path('cleanup-images/', views.cleanup_unused_markdown_images,
         name='cleanup_images'),
    path('upload-file/', views.upload_markdown_file,
         name='upload_markdown_file'),
    path('files/<int:file_id>/', views.markdown_file, name='markdown_file'),
    path('upload-image/', views.upload_markdown_image,
         name='upload_markdown_image'),
    path('images/<int:image_id>/', views.markdown_image, name='markdown_image'),
    re_path(r'^$', views.index, name='index'),
    re_path(r'^(?P<project_id>\d+)/$', views.detail, name='detail'),
]
