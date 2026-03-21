from django.db import models
from django.contrib.auth import get_user_model


class Project(models.Model):
    title = models.CharField(max_length=120)
    tagline = models.CharField(max_length=220, blank=True)
    description = models.TextField(blank=True)
    tech_stack = models.CharField(max_length=220, blank=True)
    image_url = models.CharField(max_length=255, blank=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    created_at = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at', '-id']

    def __str__(self) -> str:
        return self.title


class MarkdownImage(models.Model):
    mime_type = models.CharField(max_length=120)
    original_name = models.CharField(max_length=255, blank=True)
    data_base64 = models.TextField(blank=True)
    data_binary = models.BinaryField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='markdown_images',
    )

    class Meta:
        ordering = ['-uploaded_at', '-id']

    def __str__(self) -> str:
        return f'File {self.id}'
