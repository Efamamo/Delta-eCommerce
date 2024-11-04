import 'package:delta_ecommerce_app/data/models/user_model.dart';
import 'package:equatable/equatable.dart';

abstract class AuthState extends Equatable {
  @override
  List<Object?> get props => [];
}

final class AuthInitial extends AuthState {}

final class Authenticated extends AuthState {
  final UserModel user;
  Authenticated({required this.user});
}

final class AuthError extends AuthState {
  final String error;
  AuthError({required this.error});
}
