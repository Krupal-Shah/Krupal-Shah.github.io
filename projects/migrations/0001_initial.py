from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('tagline', models.CharField(blank=True, max_length=220)),
                ('description', models.TextField(blank=True)),
                ('tech_stack', models.CharField(blank=True, max_length=220)),
                ('image_url', models.CharField(blank=True, max_length=255)),
                ('github_url', models.URLField(blank=True)),
                ('live_url', models.URLField(blank=True)),
                ('created_at', models.DateField(blank=True, null=True)),
            ],
            options={
                'ordering': ['-created_at', '-id'],
            },
        ),
    ]
