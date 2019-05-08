describe('Current Weather Temperature', () =>{
     it('returns the correct Temp', () =>{
         console.log("in the test runner");
         //console.log(componentConvertTemp(295));
        // expect(2+1).toBe(3);
        expect(componentConvertTemp(295)).toBe(71);
     })
});