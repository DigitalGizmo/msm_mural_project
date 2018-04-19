# Generated by Django 2.0.3 on 2018-04-17 18:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pops', '0005_audio'),
    ]

    operations = [
        migrations.CreateModel(
            name='Voice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('part_num', models.IntegerField(verbose_name='Audio number')),
                ('title', models.CharField(blank=True, default='', max_length=64)),
                ('narrative', models.TextField(blank=True, default='', verbose_name='Transcription')),
                ('learnmore', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pops.Learnmore')),
            ],
            options={
                'ordering': ['part_num'],
            },
        ),
        migrations.RemoveField(
            model_name='audio',
            name='learnmore',
        ),
        migrations.DeleteModel(
            name='Audio',
        ),
    ]
