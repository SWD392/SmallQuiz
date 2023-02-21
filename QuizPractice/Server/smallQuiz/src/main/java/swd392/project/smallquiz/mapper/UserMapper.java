package swd392.project.smallquiz.mapper;

import org.mapstruct.Mapper;
import swd392.project.smallquiz.model.dto.UserAccountDto;
import swd392.project.smallquiz.model.entiity.UserAccount;
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserAccountDto employeeToEmployeeDTO(UserAccount entity);
}
