import 'dart:async';

import 'package:flutter/material.dart';
import '../auth/auth_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() =>
      _SplashScreenState();
}

class _SplashScreenState
    extends State<SplashScreen> {

  @override
  void initState() {
    super.initState();

    Timer(
      const Duration(seconds: 3),
      () {

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) =>
                const AuthScreen(),
          ),
        );

      },
    );
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: Center(
        child: Image.asset(
          "assets/images/logo.png",
          width: 200,
        ),
      ),
    );
  }
}