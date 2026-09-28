import numpy as np
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection

def generate_thicker_thinner_serpent(output_file="serpent_thick_thin.png"):
    fig, ax = plt.subplots(figsize=(16, 9), dpi=300)
    
    bg_color = '#000b1e' 
    fig.patch.set_facecolor(bg_color)
    ax.set_facecolor(bg_color)

    # --- Geometry Parameters ---
    n_longitudinal = 50   # More lines to fill the increased width cleanly
    n_transversal = 60    
    points_per_line = 600 
    serpent_width = 0.45  # Increased width for a thicker serpent
    
    y_spine = np.linspace(0, 1, points_per_line)
    # Adjusted x_spine center slightly for the new width
    x_spine = 0.3 * np.sin(2 * np.pi * y_spine) + 0.77

    # --- 1. Longitudinal Lines (Lengthwise) ---
    offsets = np.linspace(-serpent_width, serpent_width, n_longitudinal)
    
    for off in offsets:
        x_line = x_spine + off
        side_shading = (1.0 - (abs(off) / serpent_width)) ** 2.0 
        # Thinner lines
        ax.plot(x_line, y_spine, color="#1D4672", alpha=side_shading * 0.7, lw=0.4, zorder=1)

    # --- 2. Transversal Lines (The Ribs) ---
    rib_indices = np.linspace(0, points_per_line - 1, n_transversal, dtype=int)
    for idx in rib_indices:
        y_val = y_spine[idx]
        x_center = x_spine[idx]
        
        x_rib = np.linspace(x_center - serpent_width, x_center + serpent_width, 100)
        y_rib = np.full_like(x_rib, y_val)
        
        points = np.array([x_rib, y_rib]).T.reshape(-1, 1, 2)
        segments = np.concatenate([points[:-1], points[1:]], axis=1)

        rib_positions = np.linspace(0.0, 1.0, len(segments))
        rib_colors = np.tile([29 / 255, 70 / 255, 114 / 255, 1.0], (len(segments), 1))
        rib_colors[:, 3] = 0.5 * (1.0 - np.abs(2.0 * rib_positions - 1.0))
        lc = LineCollection(segments, colors=rib_colors, linewidth=0.6, zorder=2) # Thinner ribs
        ax.add_collection(lc)

    # Styling
    ax.set_xlim(0, 1.6) 
    ax.set_ylim(0, 1)   
    ax.axis('off')

    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
    plt.savefig(output_file, facecolor=bg_color, bbox_inches='tight', pad_inches=0)
    plt.show()

if __name__ == "__main__":
    generate_thicker_thinner_serpent()