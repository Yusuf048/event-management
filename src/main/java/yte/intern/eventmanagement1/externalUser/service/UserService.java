package yte.intern.eventmanagement1.externalUser.service;

import javassist.NotFoundException;
import org.springframework.stereotype.Service;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.common.enums.MessageType;
import yte.intern.eventmanagement1.event.entity.Event;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;
import yte.intern.eventmanagement1.externalUser.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    //private static final String USER_DOESNT_EXIST_MESSAGE = "User with event number %s doesn't exists!";
    private static final String USER_ALREADY_EXISTS_MESSAGE = "User with tc number %s already exists!";
    private static final String USER_ADDED_MESSAGE = "User with name %s has been successfully added!";

    private final UserRepository userRepository;

    public UserService(final UserRepository userRepository) {this.userRepository = userRepository;}

    public List<ExternalUser> getAllUsers() {return userRepository.findAll();}

    public List<Event> getAllEventsOfUser(String tcKimlikNumber) {

        ExternalUser userFromDB = userRepository.findByTcKimlikNumber(tcKimlikNumber);
        return userFromDB.extEvents().stream().toList();
    }

    //public List<ExternalUser> getSameTcUsers(String tcKimlikNumber) {return userRepository.findAllByTcKimlikNumber(tcKimlikNumber);}

    private String userAddedMessage(final String userName) {
        return USER_ADDED_MESSAGE.formatted(userName);
    }

    private String userAlreadyExistsMessage(final String userName) {
        return USER_ALREADY_EXISTS_MESSAGE.formatted(userName);
    }

    public MessageResponse addUser(final ExternalUser newExternalUser) {
        if (userRepository.existsByTcKimlikNumber(newExternalUser.tcKimlikNumber())) {
            return new MessageResponse(MessageType.ERROR, userAlreadyExistsMessage(newExternalUser.tcKimlikNumber()));
        }
        userRepository.save(newExternalUser);
        return new MessageResponse(MessageType.SUCCESS, userAddedMessage(newExternalUser.firstName()));
    }
}
