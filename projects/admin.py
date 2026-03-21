from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'tech_stack',
                    'github_url', 'live_url')
    search_fields = ('title', 'tagline', 'description', 'tech_stack')
    list_filter = ('created_at',)
