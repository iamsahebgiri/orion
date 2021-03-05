import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Icon, IconButton, Flex } from '@chakra-ui/react';
import { HiLink, HiOutlineTrash } from 'react-icons/hi';
import EditableTextField from './EditableTextField';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DraggableLinks = ({ state, setState }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const items = reorder(state, result.source.index, result.destination.index);
    setState(items);
  };

  const onSubmitEditableTextField = (nextString, index, type) => {
    const newState = state.map((element, idx) => {
      if (idx === index) {
        const newLink = { ...element };
        newLink[type] = nextString;
        return newLink;
      }
      return element;
    });
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided, snapshot) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            <Box p={3} pb={1}>
              {state.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={item.id}
                      p={[3, 5]}
                      mb={3}
                      bg="white"
                      rounded="md"
                      shadow={snapshot.isDragging ? 'md' : 'sm'}
                    >
                      <EditableTextField
                        fontWeight="bold"
                        fontSize="lg"
                        defaultValue={item.provider}
                        placeholder="Example"
                        color="gray.800"
                        onSubmit={(provider) => {
                          onSubmitEditableTextField(
                            provider,
                            index,
                            'provider'
                          );
                        }}
                      />
                      <Flex mt={2} alignItems="center">
                        <Icon as={HiLink} color="gray.600" />
                        <EditableTextField
                          fontSize="sm"
                          ml={3}
                          width="100%"
                          defaultValue={item.href}
                          placeholder="https://www.example.com"
                          color="gray.600"
                          onSubmit={(href) =>
                            onSubmitEditableTextField(href, index, 'href')
                          }
                        />
                      </Flex>
                      <Flex justifyContent="flex-end" mt={2}>
                        <IconButton
                          aria-label="icon"
                          icon={<Icon as={HiOutlineTrash} h={5} w={5} />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => {
                            const newState = [...state];
                            setState(
                              newState.filter((_, idx) => idx !== index)
                            );
                          }}
                        />
                      </Flex>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableLinks;
