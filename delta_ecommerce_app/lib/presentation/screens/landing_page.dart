import 'package:delta_ecommerce_app/blocs/bottom_nav/bottom_nav_cubit.dart';
import 'package:delta_ecommerce_app/presentation/screens/main_screens/home_screen.dart';
import 'package:delta_ecommerce_app/presentation/screens/main_screens/profile_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({super.key});

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocBuilder<BottomNavCubit, BottomNavState>(
          builder: (context, state) {
        switch (state) {
          case BottomNavState.home:
            return const HomeScreen();
          case BottomNavState.profile:
            return const ProfileScreen();
          default:
            return const HomeScreen();
        }
      }),
    );
  }
}
