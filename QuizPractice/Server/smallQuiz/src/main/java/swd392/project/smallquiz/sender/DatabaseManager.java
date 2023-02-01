package swd392.project.smallquiz.sender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.entity.Role;
import swd392.project.smallquiz.repository.RoleRepository;

import java.sql.*;

@Service
public class DatabaseManager {
    @Autowired
    RoleRepository roleRepository;
    @Value("${login.db.name}")
    private String dbName ;
    @Value("${login.db.datasource}")
    private String jdbcDriver;
    @Value("${login.db.url}")
    private String dbAddress;
    @Value("${login.db.username}")
    private String userName;
    @Value("${login.db.password}")
    private String password;
    private Statement statement;
    private Connection con;

    public void DatabaseManager() {
        try {
            Class.forName(jdbcDriver);
            con = DriverManager.getConnection(dbAddress + dbName, userName, password);
            createTableRoleName();
            createTableAccount();
            createTableGroupUser();
            autoInsertRole("ROLE_ADMIN");
            autoInsertRole("ROLE_USER");
        }
        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        catch (SQLException e) {
            System.out.println("An error has occurred on Table Creation");
        }
    }
    private void createTableRoleName() {
        String roleTable = "CREATE TABLE roles("
                + "role_id INT NOT NULL AUTO_INCREMENT,"
                + "role_name Varchar(64) NOT NULL,"
                + "PRIMARY KEY (role_id));";
        try {
            Class.forName(jdbcDriver);
            con = DriverManager.getConnection(dbAddress + dbName, userName, password);
            statement = con.createStatement();
            //The next line has the issue
            statement.executeUpdate(roleTable);
            System.out.println("Table RoleName Created");
        }
        catch (SQLException e ) {
            System.out.println("An error has occurred on Table rolename Creation");
        }
        catch (ClassNotFoundException e) {
            System.out.println("An Mysql drivers were not found");
        }
    }
    private void createTableAccount() {
        String accountTable = "CREATE TABLE users("
                + "user_id  INT NOT NULL AUTO_INCREMENT,"
                + "user_name Varchar(64) NOT NULL,"
                + "password Varchar(64) NOT NULL,"
                + "PRIMARY KEY (user_id));";
        try {
            Class.forName(jdbcDriver);
            con = DriverManager.getConnection(dbAddress + dbName, userName, password);
            statement = con.createStatement();
            //The next line has the issue
            statement.executeUpdate(accountTable);
            System.out.println("Table Account Created");
        }
        catch (SQLException e ) {
            System.out.println("An error has occurred on Table account Creation");
        }
        catch (ClassNotFoundException e) {
            System.out.println("An Mysql drivers were not found");
        }
    }
    private void createTableGroupUser() {
        String groupUserTable = "CREATE TABLE group_user("
                + "group_id INT NOT NULL AUTO_INCREMENT,"
                + "user_id INT ,"
                + "role_id INT ,"
                + "PRIMARY KEY (group_id),"
                + "FOREIGN KEY (role_id) REFERENCES roles(role_id),"
                + "FOREIGN KEY (user_id) REFERENCES users(user_id));";
        try {
            Class.forName(jdbcDriver);
            con = DriverManager.getConnection(dbAddress + dbName, userName, password);
            statement = con.createStatement();
            //The next line has the issue
            statement.executeUpdate(groupUserTable);
            System.out.println("Table GroupUser Created");
        }
        catch (SQLException e ) {
            System.out.println("An error has occurred on Table groupuser Creation");
        }
        catch (ClassNotFoundException e) {
            System.out.println("An Mysql drivers were not found");
        }
    }
    public void autoInsertRole(String role) {
        Role newRole = new Role();
        if(!roleRepository.existsByRoleName(role)) {
            newRole.setRoleName(role);
            roleRepository.save(newRole);
        }
    }
}