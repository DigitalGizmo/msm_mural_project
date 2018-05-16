from django.db import models

# Create your models here.

class Panel(models.Model):
    slug = models.SlugField('short name', max_length=48, unique=True)
    panel_title = models.CharField(max_length=48)
    panel_blurb = models.TextField(blank=True, default='')
    foreground_title = models.CharField(max_length=128, blank=True, default='')
    ordinal = models.IntegerField('Panel number', default=99)

    # return list of panels
    def panel_list(self):
        return Panel.objects.all()

    # provide x for postion in main menu
    def main_x(self):
        return 3 + ((self.ordinal - 1)*339)

    # provide x for postion in main menu
    def mini_x(self):
        return 4 + ((self.ordinal - 1)*13)

    # next, prev slide, false if none
    def get_next(self):
        next_list = Panel.objects.filter(ordinal__gt=self.ordinal)
        if next_list:
            return next_list.first()
        return False

    # Special condition added to prevent going back to slide 0 which is the intro
    def get_prev(self):
        prev_list = Panel.objects.filter(ordinal__lt=self.ordinal).order_by('-ordinal')
        if prev_list:
            prev = prev_list.first()
            if prev.ordinal > 0:
                return prev_list.first()
        return False

    class Meta:
        ordering = ['ordinal']

    def __str__(self):
        return str(self.ordinal) + "-" + self.panel_title

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
    caption = models.TextField(blank=True, default='')
    narrative = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['panel', '-article_type']

    def __str__(self):
        return str(self.panel.ordinal) + "-" + \
            self.panel.panel_title + "-" + self.article_type
        
