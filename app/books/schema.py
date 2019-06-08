import graphene
from graphene_django import DjangoObjectType

from .models import Book

class BookType(DjangoObjectType):
    class Meta:
        model = Book


class Query(graphene.ObjectType):
    books = graphene.List(BookType)

    def resolve_books(self, info, **kwargs):
        return Book.objects.all()


class CreateBook(graphene.Mutation):
    book = graphene.Field(BookType)
    class Arguments:
        title = graphene.String()
        description = graphene.String()
        imageUrl = graphene.String()

    def mutate(self, info, title, description, imageUrl):
        book = Book(title = title, description = description, imageUrl = imageUrl)
        book.save()
        return CreateBook(book=book)

class UpdateBook(graphene.Mutation):
    book = graphene.Field(BookType)
    class Arguments:
        book_id = graphene.Int(required = True)
        title = graphene.String()
        description = graphene.String()
        imageUrl = graphene.String()

    def mutate(self, info, book_id, title, description, imageUrl):
        book = Book.objects.get(id=book_id)
        book.title = title
        book.description = description
        book.imageUrl = imageUrl
        book.save()
        return UpdateBook(book=book)


class DeleteBook(graphene.Mutation):
    book_id = graphene.Int()
    class Arguments:
        book_id = graphene.Int(required = True)

    def mutate(self, info, book_id):
        book = Book.objects.get(id=book_id)
        book.delete()
        return DeleteBook(book_id=book_id)


class Mutation(graphene.ObjectType):
    create_book = CreateBook.Field()
    delete_book = DeleteBook.Field()
    update_book = UpdateBook.Field()