from django.db import models

class Learnmore(models.Model):
    """docstring for Learnmore"""
    LEARMORE_TYPE = (
        ('images','Images'),
        ('objects','Objects'),
        ('today','Today'),
        ('video','Video Story'),
        ('voices','Voices'),
    )
    article = models.ForeignKey('panels.Article', on_delete=models.CASCADE)
    learnmore_type = models.CharField(max_length=12, default='today', 
        choices=LEARMORE_TYPE)
    # slug = models.SlugField('short name', max_length=48, unique=True)
    title = models.CharField(max_length=48)
    alt_tag = models.CharField('Image description', max_length=48, blank=True, default='')
    caption = models.TextField(blank=True, default='')
    narrative = models.TextField(blank=True, default='')

    def __str__(self):
        return "p" + str(self.article.panel.ordinal) + \
        "-" + self.article.article_type + "-" + self.learnmore_type
        

class Slide(models.Model):
    learnmore = models.ForeignKey('pops.Learnmore', on_delete=models.CASCADE)
    slide_num = models.IntegerField()
    title = models.CharField(max_length=48, blank=True, default='')
    alt_tag = models.CharField('Image description', max_length=48, blank=True, default='')
    caption = models.TextField(blank=True, default='')
    narrative = models.TextField(blank=True, default='')

    # next, prev slide, false if none
    def get_next(self):
        next_list = Slide.objects.filter(learnmore_id=self.learnmore_id, 
            slide_num__gt=self.slide_num)
        if next_list:
            return next_list.first()
        return False

    # Special condition added to prevent going back to slide 0 which is the intro
    def get_prev(self):
        prev_list = Slide.objects.filter(learnmore_id=self.learnmore_id, 
            slide_num__lt=self.slide_num).order_by('-slide_num')
        if prev_list:
            prev = prev_list.first()
            if prev.slide_num > 0:
                return prev_list.first()
        return False

    class Meta:
        ordering = ['slide_num']


    def __str__(self):
        return self.learnmore.title + str(self.slide_num)


class Voice(models.Model):
    learnmore = models.ForeignKey('pops.Learnmore', on_delete=models.CASCADE)
    part_num = models.IntegerField('Audio number')
    title = models.CharField(max_length=64, blank=True, default='')
    narrative = models.TextField('Transcription', blank=True, default='')
    # citation = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['part_num']

    def __str__(self):
        return self.learnmore.title + str(self.part_num)

class Visit(models.Model):
    """
    Visit is different from Learnmore because it is a child of Panel, not
    of Article
    """
    panel = models.ForeignKey('panels.Panel', on_delete=models.CASCADE)
    title = models.CharField(max_length=48)
    alt_tag = models.CharField('Image description', max_length=48, blank=True, default='')
    caption = models.TextField(blank=True, default='')
    narrative = models.TextField(blank=True, default='')

    def __str__(self):
        return "p" + str(self.panel.ordinal) + \
        "-" + self.panel.slug + "-visit"


class Hotspot(models.Model):
    """docstring for Visit"""
    panel = models.ForeignKey('panels.Panel', on_delete=models.CASCADE)
    slug = models.SlugField('short name', max_length=48, unique=True)
    title = models.CharField(max_length=48)
    alt_tag = models.CharField('Image description', max_length=48, blank=True, default='')
    caption = models.TextField(blank=True, default='')
    narrative = models.TextField(blank=True, default='')
    x_position = models.IntegerField(blank=True, null=True)
    y_position = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return "p" + str(self.panel.ordinal) + \
        "-" + self.panel.slug + "-hotspot" + "-" + self.title


