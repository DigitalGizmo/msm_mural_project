# Generated by Django 2.0.3 on 2018-04-25 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('panels', '0005_auto_20180412_1943'),
    ]

    operations = [
        migrations.AddField(
            model_name='panel',
            name='panel_blurb',
            field=models.TextField(blank=True, default=''),
        ),
    ]
