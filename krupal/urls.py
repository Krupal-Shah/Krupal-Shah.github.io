"""
URL configuration for krupal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from portfolio import views
from projects import views as project_views

from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('admin/', project_views.admin_login, name='admin_login'),
    path('admin/logout/', project_views.admin_logout, name='admin_logout'),
    path('django-admin/', admin.site.urls),
    path('projects/', include(('projects.urls', 'projects'), namespace='projects')),
]

if settings.DEBUG:
    urlpatterns += [
        path('assets/<path:path>', serve,
             {'document_root': settings.ASSETS_ROOT}),
    ]
