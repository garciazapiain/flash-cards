import { createServer, Model } from "miragejs"

createServer({
    models: {
        card: Model,
    },

    seeds(server) {
        const today = new Date()
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        server.create("card", { id: "1", front: "lilek", back: "aubergine", deck:1, lastUpdated: today })
        server.create("card", { id: "2", front: "pečený", back: "baked", deck:1, lastUpdated: yesterday })
        server.create("card", { id: "3", front: "fazole", back: "beans", deck:2, lastUpdated:today })
        server.create("card", { id: "4", front: "hovězí", back: "beef", deck:2, lastUpdated:yesterday })
    },

    routes() {
        this.namespace = "api"
        this.logging = false
        this.passthrough(/.*/);

        this.get("/cards", (schema, request) => {
            return schema.cards.all()
        })
        
        this.get("/cards/:id", (schema, request) => {
            const id = request.params.id
            return schema.cards.find(id)
        })

           this.get("/deck/:id", (schema, request) => {
            const deckId = request.params.id;
            return schema.cards.where({ deck: parseInt(deckId, 10) });
        });
    }
})