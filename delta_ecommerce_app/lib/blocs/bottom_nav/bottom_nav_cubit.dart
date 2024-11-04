import 'package:flutter_bloc/flutter_bloc.dart';

enum BottomNavState { home, profile }

class BottomNavCubit extends Cubit<BottomNavState> {
  BottomNavCubit() : super(BottomNavState.home);

  void selectItem(BottomNavState item) {
    emit(item);
  }
}
