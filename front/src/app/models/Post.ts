export class Post{
    userId: string = ""
    email: string = ""
    _id: string = ""
    updatedAt: number = 0
    description: string = ""
    dislikes: number = 0
    likes: number = 0
    usersDisliked: string[] = []
    usersLiked: string[] = []
    imageUrl: string = ""
}