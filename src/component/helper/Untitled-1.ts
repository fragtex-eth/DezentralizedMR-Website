

type Result = {
  success: boolean;
  stack: any[];
  return: any;
};


export default function evm(code: Uint8Array, transactionData: any, blockData: any, stateData: any): Result {
  let pc = 0;
  let returnValue = 0;
  let stack: any[] = [];

  let memory = Buffer.alloc(1024); 
  let evmStorage = {};

  let success = true;

  while (pc < code.length) {
    
    const opcode = code[pc];
    console.log("now1 =" + pc);
    pc++;
    let mem;
    let valueToShift;
    let shiftAmount;
    let result = 0;
    switch (opcode) {
      case 0x60:
        stack.unshift(BigInt(code[pc]));
        break;
      case 0x37:
        let memOffset = BigInt(stack.pop());
        let calldataOffset = BigInt(stack.pop());
        let length = BigInt(stack.pop());
        let calldataBytes = Buffer.from(transactionData.data.slice(2), "hex");
        for (let i = 0; i < length; i++) {
          let byte = calldataBytes[Number(calldataOffset) + i];
          //@ts-ignore
          memory[Number(memOffset) + i] = byte ? BigInt(byte) : 0n;
        }
        console.log("mem" + memory);
        break;
      case 0x51:
        let mloadOffset = Number(stack.pop());
        let loadedValueMem = BigInt(
          "0x" + memory.slice(mloadOffset, mloadOffset + 32).toString("hex")
        );
        stack.push(loadedValueMem);
        pc--;
        break;
    }
    pc++;
  }
   return { success: success, stack, return: returnValue };
}
