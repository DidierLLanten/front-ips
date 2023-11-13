import { Cambio } from "./cambio";


describe('Cambio Enum', () => {
  it('should have Reprogramacion value', () => {
    expect(Cambio.Reprogamacion).toEqual('REPROGRAMACION');
  });

  it('should have Cambio_estado value', () => {
    expect(Cambio.Cambio_estado).toEqual('CAMBIO_ESTADO');
  });

});