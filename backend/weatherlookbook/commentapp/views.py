from django.http.response import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from boardapp.models import Board
from accountapp.models import User
from .models import Comment
# Create your views here.

@api_view(['POST', 'GET'])
@permission_classes((IsAuthenticated, ))
@csrf_exempt
def comment(request, bid):
    if request.method == 'POST':
        comment = Comment()
        comment.user = request.user
        comment.board = Board.objects.get(bid = bid)
        comment.text = request.POST.get('text')
        comment.save()
        context = {'msg':'commentcreate success', 'writer': comment.user.username}
        return JsonResponse(context)
   
    if request.method == 'GET':
        comments = Comment.objects.filter(board_id = bid)
        #print(list(comments.values()))
        comment_list = []

        for comment in comments:
            user = User.objects.get(uid = comment.user_id)
            
            comment = {'board_id':comment.board_id,
            'date':comment.date,
            'id':comment.id,
            'text':comment.text,
            'writer': user.username}
    
            comment_list.append(comment)

        #print(comment_list)
        return JsonResponse({"comment":comment_list})
