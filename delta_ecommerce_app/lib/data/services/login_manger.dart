import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class LoginManager {
  static const String tokenKey = 'userTokens';

  static Future<void> saveUserTokens(
      String accessToken, String refreshToken) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final tokenData = jsonEncode({
      'accessToken': accessToken,
      'refreshToken': refreshToken,
    });
    await prefs.setString(tokenKey, tokenData);
  }

  static Future<Map<String, String>?> getUserTokens() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final tokenData = prefs.getString(tokenKey);
    if (tokenData != null) {
      return Map<String, String>.from(jsonDecode(tokenData));
    }
    return null;
  }

  static Future<void> removeTokens() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove(tokenKey);
  }

  static Future<void> clearStorages() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }
}
