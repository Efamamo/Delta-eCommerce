import 'package:delta_ecommerce_app/core/theme/theme_data_factory.dart';
import 'package:flutter/material.dart';

import 'app_typography.dart';

abstract class AppTheme {
  static AppTheme of(BuildContext context) {
    return LightModeTheme();
  }

  late Brightness brightness;
  late Color primary;
  late Color secondary;
  late Color tertiary;
  late Color alternate;
  late Color primaryText;
  late Color secondaryText;
  late Color tertiaryText;
  late Color primaryBackground;
  late Color secondaryBackground;

  late LinearGradient primaryBackgroundGradient;
  late Color accent1;
  late Color accent2;
  late Color accent3;
  late Color accent4;
  late Color accent5;
  late Color success;
  late Color warning;
  late Color error;
  late Color info;
  late double radius;

  late Color primaryBtnText;
  late Color lineColor;
  late Color cardBackground;
  late Color cardText;
  late List<Color> cardBackgroundColors;
  late Color skeletonBaseHighlightColor;
  late Color unClickedColor;
  late Color bottomNavBar;

  late Color circularCardBackground;
  late Color inputFieldBorder;
  late Color inputFieldBackground;
  late Color textButtonColor;
  late Color appBarColor;

  AppTypography get typography => ThemeTypography(this);
  ThemeData get themeData => ThemeDataFactory.toThemeData(this);
}

class LightModeTheme extends AppTheme {
  @override
  Brightness get brightness => Brightness.light;
  @override
  Color get primary => const Color(0xFFEDEDED);
  @override
  Color get secondary => const Color(0xFF475AD7);
  @override
  Color get tertiary => const Color(0xFF2ABAFF);
  @override
  Color get alternate => const Color(0xFFE0E3E7);
  @override
  Color get primaryText => const Color(0xFF333647);
  @override
  Color get secondaryText => const Color(0xFF2ABAFF);
  @override
  Color get tertiaryText => const Color(0xFF999999);
  @override
  Color get primaryBackground => const Color(0xFFFFFFFF);
  @override
  LinearGradient get primaryBackgroundGradient => const LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [Color(0xFFFFFFFF), Color(0xFFFFFFFF)],
      );

  @override
  Color get secondaryBackground => const Color(0xFF475AD7);
  @override
  Color get accent1 => const Color(0xFFF3F4F6);
  @override
  Color get accent2 => const Color(0xFF999999);
  @override
  Color get accent3 => const Color(0xFFF4F2EE);
  @override
  Color get accent4 => const Color(0xCCFFFFFF);
  @override
  Color get accent5 => const Color(0xFF808080);
  @override
  Color get success => const Color(0xFF00970F);
  @override
  Color get warning => const Color(0xFFF9CF58);
  @override
  Color get error => const Color(0xFFE50000);
  @override
  Color get info => Colors.black;
  @override
  double get radius => 40;

  @override
  Color get primaryBtnText => const Color(0xFFFFFFFF);
  @override
  Color get lineColor => Colors.white;
  @override
  Color get cardBackground => const Color(0xAA599377);
  @override
  Color get cardText => const Color(0xFF2E2E2E);
  @override
  Color get bottomNavBar => const Color(0X99092749);
  @override
  Color get skeletonBaseHighlightColor =>
      const Color.fromARGB(170, 199, 199, 199);
  Color get unclickedColor => accent2;
  @override
  Color get circularCardBackground => const Color(0XFF465B6F);
  @override
  Color get inputFieldBorder => const Color(0xFF003068);
  @override
  Color get textButtonColor => const Color(0xFF003068);
  @override
  Color get inputFieldBackground => const Color(0xFFF9FCFE);
}
