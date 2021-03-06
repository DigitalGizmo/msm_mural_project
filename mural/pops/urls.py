from django.urls import path

from . import views

app_name="pops"

urlpatterns = [

    path('credits/ajax/<int:pk>/', views.CreditsDetailView.as_view(), 
        name='credits_ajax_detail'),

    path('today/ajax/<int:pk>/', views.TodayDetailView.as_view(), 
        name='today_ajax_detail'),

    path('video/ajax/<int:pk>/', views.VideoDetailView.as_view(), 
        name='video_ajax_detail'),

    path('visit/ajax/<int:pk>/', views.VisitDetailView.as_view(), 
        name='visit_ajax_detail'),

    path('voices/ajax/<int:pk>/', views.VoicesDetailView.as_view(), 
        name='voices_ajax_detail'),

    path('hotspot/ajax/<slug:slug>/', views.HotspotDetailView.as_view(), 
        name='hotspot_ajax_detail'),

    # first call is without slide_num
    path('images/ajax/<int:pk>/', views.ImagesDetailView.as_view(), 
        name='images_ajax_detail'),
    path('images/ajax/<int:pk>/<int:slide_num>/', views.ImagesDetailView.as_view(), 
        name='images_num_ajax_detail'),
    
    path('objects/ajax/<int:pk>/', views.ObjectsDetailView.as_view(), 
        name='objects_ajax_detail'),
    path('objects/ajax/<int:pk>/<int:slide_num>/', views.ObjectsDetailView.as_view(), 
        name='objects_num_ajax_detail'),

]
