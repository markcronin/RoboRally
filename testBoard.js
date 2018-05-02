const testBoard = [
  [
    {position: [0,0], type: "floor",  flag1: 8,  flag2: 3, north: true,  east: false,  south: false, west: true,  lasers: false, turner: 0, conveyor: [0,0], expressConveyor: [0,0], wrench: false},
    {position: [1,0], type: "floor",  flag1: 7,  flag2: 2, north: true,  east: false,  south: false, west: false, lasers: false, turner: 0, conveyor: [1,0], expressConveyor: [0,0], wrench: false},
    {position: [2,0], type: "floor",  flag1: 6,  flag2: 3, north: true,  east: false,  south: false, west: false, lasers: false, turner: 0, conveyor: [1,0], expressConveyor: [0,0], wrench: false},
    {position: [3,0], type: "floor",  flag1: 5,  flag2: 4, north: true,  east: false,  south: false, west: false, lasers: false, turner: 0, conveyor: [1,0], expressConveyor: [0,0], wrench: false},
    {position: [4,0], type: "floor",  flag1: 4,  flag2: 5, north: true,  east: false,  south: false, west: false, lasers: false, turner: 0, conveyor: [1,0], expressConveyor: [0,0], wrench: false},
    {position: [5,0], type: "pit",    flag1: 5,  flag2: 6, north: true,  east: true,   south: false, west: false, lasers: false, turner: 0, conveyor: [0,0], expressConveyor: [0,0], wrench: false}
  ], [
    {position: [0,1], type: "floor",  flag1: 9,  flag2: 2, north: false,  east: false,  south: false, west: true,  lasers: false, turner: 0, conveyor: [0,0], expressConveyor: [0,0], wrench: false},
    {position: [1,1], type: "floor",  flag1: 8,  flag2: 1, north: false,  east: false,  south: false, west: false, lasers: false, turner: 0, conveyor: [0,0], expressConveyor: [0,0], wrench: false},
    {position: [2,1], type: "floor",  flag1: 7,  flag2: 2, north: false,  east: false,  south: true,  west: false, lasers: false, turner: 0, conveyor: [0,0], expressConveyor: [0,0], wrench: false},
    {position: [3,1], type: "floor",  flag1: 6,  flag2: 3, north: false,  east: false,  south: true,  west: false, lasers: false, turner: 1, conveyor: [0,0], expressConveyor: [0,0], wrench: false},
    {position: [4,1], type: "floor",  flag1: 3,  flag2: 4, north: false,  east: false,  south: false, west: false, lasers: false, turner: 0, conveyor: [0,0], expressConveyor: [0,0], wrench: false},
    {position: [5,1], type: "floor",  flag1: 4,  flag2: 5, north: false,  east: true,   south: false, west: false, lasers: false, turner: 0, conveyor: [0,0], expressConveyor: [0,0], wrench: true}
  ], [
    {position: [0,2], type: "floor",  flag1: 8,  flag2: 1, north: false,  east: false,  south: false, west: true,  lasers: false, turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [1,2], type: "floor",  flag1: 7,  flag2: 0, north: false,  east: true,   south: false, west: false, lasers: false, turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [2,2], type: "floor",  flag1: 4,  flag2: 5, north: true,   east: false,  south: false, west: true,  lasers: false, turner: 0,  conveyor: [0,1],  expressConveyor: [0,1],  wrench: false},
    {position: [3,2], type: "floor",  flag1: 3,  flag2: 6, north: true,   east: false,  south: false, west: false, lasers: false, turner: -1, conveyor: [-1,0], expressConveyor: [-1,0], wrench: false},
    {position: [4,2], type: "floor",  flag1: 2,  flag2: 5, north: false,  east: false,  south: false, west: false, lasers: false, turner: 0,  conveyor: [-1,0], expressConveyor: [-1,0], wrench: false},
    {position: [5,2], type: "floor",  flag1: 3,  flag2: 6, north: false,  east: true,   south: false, west: false, lasers: false, turner: 0,  conveyor: [-1,0], expressConveyor: [-1,0], wrench: false}
  ], [
    {position: [0,3], type: "floor",  flag1: 7,  flag2: 2, north: false,  east: false,  south: false, west: true,  lasers: false, turner: -1, conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [1,3], type: "floor",  flag1: 6,  flag2: 1, north: false,  east: true,   south: false, west: false, lasers: false, turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [2,3], type: "floor",  flag1: 3,  flag2: 4, north: true,   east: false,  south: false, west: true,  lasers: false, turner: 0,  conveyor: [0,1],  expressConveyor: [0,1],  wrench: false},
    {position: [3,3], type: "floor",  flag1: 2,  flag2: 5, north: true,   east: false,  south: false, west: false, lasers: false, turner: -1, conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [3,3], type: "floor",  flag1: 1,  flag2: 6, north: false,  east: false,  south: false, west: false, lasers: false, turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [5,3], type: "floor",  flag1: 2,  flag2: 7, north: false,  east: true,   south: false, west: false, lasers: false, turner: -1, conveyor: [0,-1], expressConveyor: [0,-1], wrench: false}
  ], [
    {position: [0,4], type: "floor",  flag1: 6,  flag2: 3, north: false,  east: false,  south: false, west: true,  lasers: true,  turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [1,4], type: "floor",  flag1: 5,  flag2: 2, north: false,  east: false,  south: false, west: false, lasers: true,  turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [2,4], type: "floor",  flag1: 4,  flag2: 3, north: false,  east: false,  south: false, west: false, lasers: true,  turner: -1, conveyor: [0,1],  expressConveyor: [0,1],  wrench: false},
    {position: [3,4], type: "floor",  flag1: 3,  flag2: 4, north: false,  east: true,   south: false, west: false, lasers: true,  turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [4,4], type: "floor",  flag1: 0,  flag2: 7, north: true,   east: false,  south: false, west: true,  lasers: false, turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [5,4], type: "floor",  flag1: 1,  flag2: 8, north: false,  east: true,   south: false, west: false, lasers: false, turner: 0,  conveyor: [0,-1], expressConveyor: [0,-1], wrench: false}
  ], [
    {position: [0,5], type: "floor",  flag1: 5,  flag2: 4, north: false,  east: false,  south: true, west: true,  lasers: false, turner: 1,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [1,5], type: "floor",  flag1: 4,  flag2: 3, north: false,  east: false,  south: true, west: false, lasers: false, turner: 0,  conveyor: [0,0],  expressConveyor: [0,0],  wrench: false},
    {position: [2,5], type: "floor",  flag1: 3,  flag2: 4, north: false,  east: false,  south: true, west: false, lasers: false, turner: 0,  conveyor: [1,0],  expressConveyor: [1,0],  wrench: false},
    {position: [3,5], type: "floor",  flag1: 2,  flag2: 5, north: false,  east: false,  south: true, west: false, lasers: false, turner: 0,  conveyor: [1,0],  expressConveyor: [1,0],  wrench: false},
    {position: [4,5], type: "floor",  flag1: 1,  flag2: 6, north: false,  east: false,  south: true, west: false, lasers: false, turner: -1, conveyor: [1,0],  expressConveyor: [1,0],  wrench: false},
    {position: [5,5], type: "floor",  flag1: 2,  flag2: 7, north: false,  east: true,   south: true, west: false, lasers: false, turner: 0,  conveyor: [0,-1], expressConveyor: [0,-1], wrench: false}
  ]
];

module.exports = testBoard;
