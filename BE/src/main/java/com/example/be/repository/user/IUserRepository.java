package com.example.be.repository.user;

import com.example.be.dto.user.IUserListDto;
import com.example.be.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User,Integer> {

    @Query(value = "select u.id, u.name,u.address as address, u.birth_day as birthDay," +
            " u.email as email, a.user_name as userName " +
            "from `user` u \n" +
            "left join `account` a on a.id = u.account_id\n" +
            "group by u.id\n" +
            "order by u.id desc",nativeQuery = true)
    Page<IUserListDto> findAllUser(Pageable pageable);

    Boolean existsByEmail (String email);
}
