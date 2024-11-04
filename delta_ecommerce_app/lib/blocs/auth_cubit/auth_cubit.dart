import 'package:delta_ecommerce_app/blocs/auth_cubit/auth_state.dart';
import 'package:delta_ecommerce_app/data/services/auth_services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AuthCubit extends Cubit<AuthState> {
  final AuthServices authServices;
  AuthCubit({required this.authServices}) : super(AuthInitial());
}
