# Generated by Django 2.0.3 on 2018-03-29 16:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('article_type', models.IntegerField(choices=[(1, 'intro'), (2, 'foreground'), (3, 'background')], default=1)),
                ('image_name', models.CharField(blank=True, default='', max_length=32)),
                ('caption', models.CharField(blank=True, default='', max_length=255, verbose_name='Image Caption')),
                ('narrative', models.TextField(blank=True, default='')),
            ],
        ),
        migrations.CreateModel(
            name='Panel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(max_length=48, unique=True, verbose_name='short name')),
                ('panel_title', models.CharField(max_length=48)),
                ('foreground_title', models.CharField(blank=True, default='', max_length=128)),
                ('ordinal', models.IntegerField(default=99, verbose_name='Order in Menu')),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='panel',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='panels.Panel'),
        ),
    ]
