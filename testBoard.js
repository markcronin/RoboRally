const testBoard = [
  [
    {position: [0,0], type: "floor",  north: true,  east: false,  south: false, west: true},
    {position: [1,0], type: "floor",  north: true,  east: false,  south: false, west: false},
    {position: [2,0], type: "floor",  north: true,  east: false,  south: false, west: false},
    {position: [3,0], type: "floor",  north: true,  east: false,  south: false, west: false},
    {position: [4,0], type: "floor",  north: true,  east: false,  south: false, west: false},
    {position: [5,0], type: "pit",    north: true,  east: true,   south: false, west: false}
  ], [
    {position: [0,1], type: "floor",  north: false,  east: false,  south: false, west: true},
    {position: [1,1], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [2,1], type: "floor",  north: false,  east: false,  south: true,  west: false},
    {position: [3,1], type: "floor",  north: false,  east: false,  south: true,  west: false},
    {position: [4,1], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [5,1], type: "floor",  north: false,  east: true,   south: false, west: false}
  ], [
    {position: [0,2], type: "floor",  north: false,  east: false,  south: false, west: true},
    {position: [1,2], type: "floor",  north: false,  east: true,   south: false, west: false},
    {position: [2,2], type: "floor",  north: true,   east: false,  south: false, west: true},
    {position: [3,2], type: "floor",  north: true,   east: false,  south: false, west: false},
    {position: [4,2], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [5,2], type: "floor",  north: false,  east: true,   south: false, west: false}
  ], [
    {position: [0,3], type: "floor",  north: false,  east: false,  south: false, west: true},
    {position: [1,3], type: "floor",  north: false,  east: true,   south: false, west: false},
    {position: [2,3], type: "floor",  north: true,   east: false,  south: false, west: true},
    {position: [3,3], type: "floor",  north: true,   east: false,  south: false, west: false},
    {position: [3,3], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [5,3], type: "floor",  north: false,  east: true,   south: false, west: false}
  ], [
    {position: [0,4], type: "floor",  north: false,  east: false,  south: false, west: true},
    {position: [1,4], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [2,4], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [3,4], type: "floor",  north: false,  east: true,   south: false, west: false},
    {position: [4,4], type: "floor",  north: true,   east: false,  south: false, west: true},
    {position: [5,4], type: "floor",  north: false,  east: true,   south: false, west: false}
  ], [
    {position: [0,5], type: "pit",    north: false,  east: false,  south: true, west: true},
    {position: [1,5], type: "floor",  north: false,  east: false,  south: true, west: false},
    {position: [2,5], type: "floor",  north: false,  east: false,  south: true, west: false},
    {position: [3,5], type: "floor",  north: false,  east: false,  south: true, west: false},
    {position: [4,5], type: "floor",  north: false,  east: false,  south: true, west: false},
    {position: [5,5], type: "floor",  north: false,  east: true,   south: true, west: false}
  ]
];

module.exports = testBoard;
