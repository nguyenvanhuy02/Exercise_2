package com.example.be.controller;

import com.example.be.dto.request.LoginForm;
import com.example.be.dto.response.JwtRespone;
import com.example.be.security.jwt.JwtProvider;
import com.example.be.security.user.MyUserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
public class SecurityController {

    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginForm loginForm) {


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUserName(), loginForm.getPassword()));

        MyUserDetail myUserDetail = (MyUserDetail) authentication.getPrincipal();

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.createToken(authentication);

        return new ResponseEntity<>(new JwtRespone(token,
                                                    myUserDetail.getAuthorities(),
                                                    myUserDetail.getAccount(),
                                                    myUserDetail.getAccount().getUser()), HttpStatus.OK);
    }
}
