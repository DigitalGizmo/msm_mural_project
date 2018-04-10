from django.db import models

class Learnmore(models.Model):
    """docstring for Learnmore"""
    LEARMORE_TYPE = (
        ('object','Object'),
        ('slideshow','Images'),
        ('today','Today'),
        ('video','Video Story'),
        ('visit','Visit'),
        ('voices','Voices'),
    )
    article = models.ForeignKey('panels.Article', on_delete=models.CASCADE)
    learnmore_type = models.CharField(max_length=12, default='object', 
        choices=LEARMORE_TYPE)
    slug = models.SlugField('short name', max_length=48, unique=True)
    title = models.CharField(max_length=48, default='Title goes here')
    caption = models.TextField(blank=True, default='')
    narrative = models.TextField(blank=True, default='')

    def __str__(self):
        return self.slug
        
