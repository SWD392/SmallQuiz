package swd392.project.smallquiz.mapper;

import org.mapstruct.Mapper;
import swd392.project.smallquiz.model.dto.RoleDto;
import swd392.project.smallquiz.model.entiity.Role;
@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleDto convertRole(Role role);
}
