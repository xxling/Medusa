

var g = {
    "nodes": [0, 1, 2, 3, 4, 5],
    "edges": [
        [2, 1], [1, 2],
        [0, 2], [2, 0],
        [2, 3], [3, 2],
        [1, 4], [4, 1],
        [3, 4], [4, 3],
        [4, 5], [5, 4]

    ]
}


var graph,S;
var root = 0;
var pink = "#FFCCE0";
var white = "#FFFFFF";
var gray = "#EEEEEE";
var black = "#BBBBBB"


var restart = function() {

    graph = new Springy.Graph();
    graph.loadJSON(g);
    $('#graph').springy({ graph: graph });

    // clear the S
    S = [];

    // initialize the value
    for (var i in graph.nodes) {
        graph.nodes[i].data.prev = undefined;
        graph.nodes[i].color = white;
    }

    for (var i in graph.edges) {
        graph.edges[i].color = gray;
    }

    S.push(root);
    graph.nodes[root].color = pink;
    

    graph.notify();
}

restart();

var step = function() {
    if (S.length == 0) return;
    
    if (S.length == 0) return;
    
    var u = S[S.length-1];   // peek          
    var rcolor = getRandomColor();
    var has_unvisited_children = false;


    // visit neighbours in reversed order
    for (var i=graph.nodes[u].out.length-1; i>=0; i--) {
        var v = graph.nodes[u].out[i];

        if (graph.nodes[v].color == pink && graph.nodes[u].data.prev != v) 
        {
            alert(u + " -> "+ v + " is a back edge!");
            graph.setEdgeColor(u, v , "red");
            
        } else if (graph.nodes[v].color == white) {
            graph.setEdgeColor(u, v, rcolor);
            S.push(v);  
            graph.nodes[v].data.prev = u
            graph.nodes[v].color = pink; // in the frontier
            has_unvisited_children = true;
          
        } else {
            e = graph.getEdge(u, v);
            if (e.color == gray) e.color = white; // hide the 'useless' edge
        }
    }

    if (has_unvisited_children == false) {
        graph.nodes[u].color = black;
        S.pop();
    }

    graph.notify();
}
