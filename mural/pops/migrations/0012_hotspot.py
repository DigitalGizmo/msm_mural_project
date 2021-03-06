# Generated by Django 2.0.3 on 2018-04-25 18:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('panels', '0006_panel_panel_blurb'),
        ('pops', '0011_auto_20180425_0947'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hotspot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=48)),
                ('alt_tag', models.CharField(blank=True, default='', max_length=48, verbose_name='Image description')),
                ('caption', models.TextField(blank=True, default='')),
                ('narrative', models.TextField(blank=True, default='')),
                ('x_position', models.IntegerField(blank=True, null=True)),
                ('y_position', models.IntegerField(blank=True, null=True)),
                ('panel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='panels.Panel')),
            ],
        ),
    ]
