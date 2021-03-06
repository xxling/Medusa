

var g = {
    "nodes": [0, 1, 2, 3, 4, 5],
    "edges": [
        [0, 1, {w: 41}],
        [1, 2, {w: 51}],
        [2, 3, {w: 50}],
        [4, 3, {w: 36}],
        [3, 5, {w: 38}],
        [3, 0, {w: 45}],
        [0, 5, {w: 29}],
        [5, 4, {w: 21}],
        [1, 4, {w: 32}],
        [4, 2, {w: 32}],
        [5, 1, {w: 29}],
    ]
}


var graph, Q;
var INF = 100000;

var restart = function() {
    graph = new Springy.Graph();
    graph.loadJSON(g);
    $('#graph').springy({ graph: graph });


    // Q is the nodes set for traversing
    Q = [];

    // initialize the values in each nodes
    for (var i in graph.nodes) {
        graph.nodes[i].data.dist = INF;
        graph.nodes[i].data.prev = undefined;
        graph.nodes[i].color = "#FFCCE0";
        Q.push(i);   
    }

    // colorize the edges
    for (var i in graph.edges) {
        graph.edges[i].color = "#EEEEEE";
    }

    // make 0 the source node
    graph.nodes[0].data.dist = 0;

    graph.notify();
}

restart();


// simulate a priority queue with sorting
var reorder = function() {
    Q.sort(function compare(a, b){ return graph.nodes[a].data.dist-graph.nodes[b].data.dist });
}


var step = function() {
    if (Q.length == 0) return; // no more nodes
    var u = Q.shift();         // dequeue

    graph.nodes[u].color = "#BBBBBB";  
    var rcolor = getRandomColor();

    // visiting all the outgoing edges 
    for (var i in graph.nodes[u].out) {
        var v = graph.nodes[u].out[i];
        var alt = graph.nodes[u].data.dist + graph.getEdge(u, v).data.w;
        if (alt < graph.nodes[v].data.dist) {
            graph.setEdgeColor(u, v, rcolor);
            graph.nodes[v].data.dist = alt;
            // erase the loser
            if (graph.nodes[v].data.prev != undefined) {
                var prev = graph.nodes[v].data.prev;
                graph.setEdgeColor(prev, v, "#FFFFFF");
            }
            graph.nodes[v].data.prev = u;
            // reorder the value in Q by decreasing dist[]
            reorder();
        } else {
            graph.setEdgeColor(u, v, "#FFFFFF");
        }
    }
    graph.notify();
}
