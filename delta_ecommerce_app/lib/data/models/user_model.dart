import 'package:equatable/equatable.dart';

class UserModel extends Equatable {
  final String id;
  final String username;
  final String? password;

  const UserModel({required this.id, required this.username, this.password});

  Map<String, dynamic> toJson() {
    return {'id': id, 'username': username};
  }

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id'],
      username: json['username'],
    );
  }

  @override
  List<Object> get props => [id, username, password!];
}
