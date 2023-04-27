import React, { ChangeEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext } from 'react';
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const {addNewEntry} = useContext(EntriesContext)
  const { isAddingEntry , setIsAddingEntry } = useContext(UIContext)
 // const [isAdding, setisAdding] = useState(false);
  const [inputValue, setinputValue] = useState("")
  const [touched , setTouched] = useState(false);

  const onTextFieldChanged =(event:ChangeEvent<HTMLInputElement>)=>{
    setinputValue(event.target.value);
  }

  const onSave = () =>{
    if(inputValue.length === 0) return;
    console.log(inputValue)
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false)
    setinputValue("");
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva Entrada"
            autoFocus
            multiline
            helperText="Ingrese un Valor"
            value={inputValue}
            error={inputValue.length <=0 && touched}
            onChange={onTextFieldChanged}
            label="Nueva Entrada"
            onBlur={()=>setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={()=>setIsAddingEntry(false)} variant="text">Cancelar</Button>
            <Button onClick={onSave} variant="outlined" color="secondary" endIcon={<SaveIcon />}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineIcon />}
          fullWidth
          variant="outlined"
          onClick={()=>setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
