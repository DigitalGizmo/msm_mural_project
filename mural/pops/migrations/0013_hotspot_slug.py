# Generated by Django 2.0.3 on 2018-04-25 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pops', '0012_hotspot'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotspot',
            name='slug',
            field=models.SlugField(default='lunch-bucket', max_length=48, unique=True, verbose_name='short name'),
            preserve_default=False,
        ),
    ]