import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton
} from '@chakra-ui/react';
import { HiX, HiOutlineCheck, HiPencil } from 'react-icons/hi';

const EditableTextField = (props) => {
  const EditableControls = ({ isEditing, onSubmit, onCancel, onEdit }) => {
    return isEditing ? (
      <ButtonGroup size="sm" ml={1}>
        <IconButton
          icon={<Icon as={HiOutlineCheck} />}
          variant="ghost"
          onClick={onSubmit}
        />
        <IconButton
          icon={<Icon as={HiX} />}
          variant="ghost"
          onClick={onCancel}
        />
      </ButtonGroup>
    ) : (
      <Flex>
        <IconButton
          size="sm"
          icon={<Icon as={HiPencil} />}
          variant="ghost"
          onClick={onEdit}
        />
      </Flex>
    );
  };
  return (
    <Editable {...props} isPreviewFocusable={false} submitOnBlur={false}>
      {(props) => (
        <Flex justifyContent="space-between">
          <EditablePreview />
          <EditableInput _focus={{ boxShadow: 0 }} />
          <EditableControls {...props} />
        </Flex>
      )}
    </Editable>
  );
};

export default EditableTextField;
