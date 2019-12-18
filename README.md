# Visualisation des tournées

Pour visualiser les tournées, il faut les mettre au format json

Je vous propose une méthode à mettre dans la classe instance, à modifier selon vos besoins

````
public void writeJson() {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(this.nom + ".js"));
            bw.write("let solutions = [\n");
            for (Solution solution : solutions) {
                bw.write("{\n");
                bw.write("\"shifts\":[");
                for (Shift shift : solution.getShifts()) {
                    bw.write("{id:" + shift.getId() + ", tournees:[");
                    for (Tournee tournee : shift.getTournees()) {
                        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                        bw.write("{id:" + tournee.getId() +
                                ", debut:'" + sdf.format(tournee.getDebut()) +
                                "', fin:'" + sdf.format(tournee.getFin()) + "'},\n");
                    }
                    bw.write("]},");
                }
                bw.write("]");
            }
            bw.write("}]");
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
````
