from django.urls import path

from . import views

app_name="panels"

urlpatterns = [
    path('<slug:slug>/<article_type>/', views.PanelDetailView.as_view(), name='panel_detail'),
    path('<slug:slug>/', views.PanelDetailView.as_view(), name='panel_detail'),
]
