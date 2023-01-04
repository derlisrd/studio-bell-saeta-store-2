import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Zoom } from '@mui/material'
import React from 'react'
import { useVentas } from './VentasProvider'

const DialogComision = () => {

    const {dialogs,setDialogs,datosFacturas,indexFactura,indexPrecioCambiar,lang,setearFactura} = useVentas()

    const fa = datosFacturas.facturas[indexFactura]
    const ve = datosFacturas
  
    const change = (e)=>{
      let newvalue = (e.target.value)
      let fa = {...datosFacturas}
      fa.facturas[indexFactura].itemsFactura[indexPrecioCambiar].id_empleado = newvalue
      setearFactura(fa)
    }
    const changeComision = e=>{
      let newvalue = (e.target.value)
      let fa = {...datosFacturas}
      fa.facturas[indexFactura].itemsFactura[indexPrecioCambiar].porcentaje_comision = parseFloat(newvalue)
      setearFactura(fa)
    }

    const cerrar = ()=>{ 
      let fa = {...datosFacturas}
      if(fa.facturas[indexFactura].itemsFactura[indexPrecioCambiar].id_empleado === ''){
        return false;
      }
      setDialogs({...dialogs,comision:false})
    }

    if(indexPrecioCambiar>=0)
  {
  return (
    <Dialog fullWidth
    open={dialogs.comision}
    onClose={cerrar}
    TransitionComponent={Zoom}>
      <DialogTitle>Eligir empleado - Comisión</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
                  <InputLabel >
                    {lang.seleccione_vendedor}
                  </InputLabel>
                  <Select
                    name="id_empleado"
                    onChange={change}
                    fullWidth
                    value={(fa.itemsFactura[indexPrecioCambiar].id_empleado)}
                  >
                    <MenuItem value="" selected disabled>
                      <em>{lang.seleccione_vendedor}</em>
                    </MenuItem>

                    {ve.listaVendedores.map((e, i) => (
                      <MenuItem value={e.id_empleado} key={i}>
                        {e.nombre_empleado} {e.apellido_empleado}
                      </MenuItem>
                    ))}
                  </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="number" value={fa.itemsFactura[indexPrecioCambiar].porcentaje_comision} onChange={changeComision} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}


return (<></>)

}

export default DialogComision
