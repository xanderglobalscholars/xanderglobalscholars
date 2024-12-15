import 'package:json_annotation/json_annotation.dart';

part 'post.g.dart';

@JsonSerializable()
class Post {
  final String id;
  final String title;
  final String content;
  final String author;
  final String category;
  final List<Attachment>? attachments;
  final List<String>? tags;
  final int views;
  final List<String>? likes;
  final String status;
  final DateTime createdAt;
  final DateTime updatedAt;

  Post({
    required this.id,
    required this.title,
    required this.content,
    required this.author,
    required this.category,
    this.attachments,
    this.tags,
    this.views = 0,
    this.likes,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
  });

  // JSON serialization/deserialization
  factory Post.fromJson(Map<String, dynamic> json) => _$PostFromJson(json);
  Map<String, dynamic> toJson() => _$PostToJson(this);
}

@JsonSerializable()
class Attachment {
  final String url;
  final String type;

  Attachment({required this.url, required this.type});

  // JSON serialization/deserialization
  factory Attachment.fromJson(Map<String, dynamic> json) =>
      _$AttachmentFromJson(json);
  Map<String, dynamic> toJson() => _$AttachmentToJson(this);
}
