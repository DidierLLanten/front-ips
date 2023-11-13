import { Eps } from './eps';

describe('Eps Class', () => {
  it('should create an instance', () => {
    const eps = new Eps();
    expect(eps).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const eps = new Eps();
    
    expect(eps.id).toBeUndefined();
    expect(eps.eps).toBeUndefined();
    expect(eps.nit).toBeUndefined();
  });

  it('should set properties with provided values', () => {
    const id = 1;
    const epsName = 'NombreEPS';
    const epsNit = '1234567890';

    const eps = new Eps();
    eps.id = id;
    eps.eps = epsName;
    eps.nit = epsNit;

    expect(eps.id).toEqual(id);
    expect(eps.eps).toEqual(epsName);
    expect(eps.nit).toEqual(epsNit);
  });

});