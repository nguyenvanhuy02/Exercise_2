package com.example.be.controller;

import com.example.be.dto.response.MessageRespone;
import com.example.be.dto.user.EmailDto;
import com.example.be.dto.user.IUserListDto;
import com.example.be.dto.user.UserDto;
import com.example.be.dto.user.UserName;
import com.example.be.model.account.Account;
import com.example.be.model.user.User;
import com.example.be.service.IAccountRoleService;
import com.example.be.service.IAccountService;
import com.example.be.service.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IAccountRoleService accountRoleService;

    @GetMapping("/list")
    public ResponseEntity<Page<IUserListDto>> findAllUser(@PageableDefault(value = 5) Pageable pageable) {
        Page<IUserListDto> userListDto = userService.findAllUser(pageable);
        if (userListDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userListDto, HttpStatus.OK);
    }


    @PostMapping("/checkUniqueEmail")
    public ResponseEntity<?> checkUnique(@RequestBody EmailDto emailDto) {
        if (userService.existsByEmail(emailDto.getEmail())) {
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>(false,HttpStatus.OK);
    }

    @PostMapping("/checkUniqueUserName")
    public ResponseEntity<?> checkUniqueUserName(@RequestBody UserName userName) {
        if (accountService.existsByUserName(userName.getUserName())) {
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>(false,HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDto userDto) {
        User user = new User();
        Account account = new Account();
        BeanUtils.copyProperties(userDto, account);


        BeanUtils.copyProperties(userDto, userService);
        account.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Account account1 = accountService.createAccount(account);

        BeanUtils.copyProperties(userDto, user);

        user.setAccount(account1);


        userService.createUser(user);
        accountRoleService.createAccountRole(user.getAccount().getId(), 2);
        return new ResponseEntity<>(new MessageRespone("yes"), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<User> deatailAnime(@PathVariable Integer id){
        User user = userService.getUserById(id);
        try {
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (NullPointerException e) {
            e.getStackTrace();
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
