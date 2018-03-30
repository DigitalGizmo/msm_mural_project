from django.db import models

# Create your models here.

class Panel(models.Model):
    slug = models.SlugField('short name', max_length=48, unique=True)
    panel_title = models.CharField(max_length=48)
    foreground_title = models.CharField(max_length=128, blank=True, default='')
    ordinal = models.IntegerField('Order in Menu', default=99)

    class Meta:
        ordering = ['ordinal']

    def __str__(self):
        return self.panel_title

class Article(models.Model):
    """docstring for Article"""
    ARTICLE_TYPE = (
        ('intro','Introduction'),
        ('fore','Foreground'),
        ('back','Background'),
    )
    panel = models.ForeignKey('panels.Panel', on_delete=models.CASCADE)
    article_type = models.CharField(max_length=12, default='intro', 
        choices=ARTICLE_TYPE)
    title = models.CharField(max_length=48, default='Title goes here')
    image_name = models.CharField(max_length=32, blank=True, default='')
    caption = models.CharField('Image Caption', max_length=255, blank=True, default='')
    narrative = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['panel', 'article_type']

    def __str__(self):
        return str(self.panel.panel_title) + "-" + str(self.article_type)
        
