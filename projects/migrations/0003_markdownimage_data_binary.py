from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('projects', '0002_markdownimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='markdownimage',
            name='data_binary',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
