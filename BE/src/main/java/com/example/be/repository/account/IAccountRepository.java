package com.example.be.repository.account;

import com.example.be.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface IAccountRepository extends JpaRepository<Account, Integer> {

    @Query(
            value = " select * " +
                    " from account " +
                    " where user_name = :username ",
            nativeQuery = true
    )
    Account findAccountByUsername(@Param("username") String username);

    Optional<Account> findByUserName (String name);

    Boolean existsByUserName ( String username);
}
