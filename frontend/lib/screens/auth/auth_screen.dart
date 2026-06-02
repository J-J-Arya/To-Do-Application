import 'package:flutter/material.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment:
              MainAxisAlignment.center,

          children: [

            Image.asset(
              "assets/images/logo.png",
              width: 120,
            ),

            // SizedBox(height: 20),

            Text(
              "Welcome Back",
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),

            // SizedBox(height: 10),

            Text(
              "Manage your tasks efficiently",
            ),

          ],
        ),
      ),
    );
  }
}