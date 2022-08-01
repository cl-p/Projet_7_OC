export class Post{
    userId: string = ""
    name: string = ""
    _id: string = ""
    description: string = ""
    dislikes: number = 0
    likes: number = 0
    usersDisliked: string[] = []
    usersLiked: string[] = []
    imageUrl: string = ""
}